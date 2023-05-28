import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

/**
 * Wrapper of {@link Subject} used to hidde internal details and provide common used functionality.
 *
 * @typeParam <T>
 *   Type of data managed by this {@link Subject}
 */
export class GenericSubject<T> {

  private constructor(protected readonly subject: Subject<T>) { }


  /**
   * Returns a new {@link GenericSubject} using provided {@code firstValue} as initial value to send.
   *
   * @param firstValue
   *    Initial value to send using internal {@link Subject}
   *
   * @return a new {@link GenericSubject}, internally using {@link BehaviorSubject} if a {@code firstValue} was provided,
   *         or {@link Subject} otherwise.
   */
  static of = <T>(firstValue?: T): GenericSubject<T> =>
    new GenericSubject<T>(
      firstValue
        ? new BehaviorSubject<T>(firstValue)
        : new Subject<T>()
    );


  /**
   * Creates a new {@link Observable} with this {@link Subject} as the source.
   *
   * <pre>
   * Example:
   *
   *   @Injectable({
   *     providedIn: 'root'
   *   })
   *   export class MyComponentCommunicationService {
   *      private readonly myModelSubject: GenericSubject<MyModel>;
   *      public readonly myModelObservable$: Observable<MyModel>;
   *
   *     constructor() {
   *        this.myModelSubject = new GenericSubject<MyModel>();
   *        this.myModelObservable$ = this.myModelSubject.asObservable();
   *     }
   *
   *     public sendNewModelSubject(obj: MyModel) {
   *       this.myModelSubject.send(obj);
   *     }
   *   }
   *
   *
   *   @Component({ ... })
   *   export class TestPurposeComponent implements OnInit {
   *
   *      constructor(
   *        private myComponentCS: MyComponentCommunicationService
   *      ) {}
   *
   *      ngOnInit() {
   *        this.myComponentCS.myModelObservable$.subscribe((newValue: MyModel) => {
   *           ...
   *        });
   *      }
   *   }
   * </pre>
   *
   * @returns {Observable} that the {@link Subject} casts to
   */
  asObservable = (): Observable<T> =>
    this.subject.asObservable();


  /**
   *    Creates a new {@link Observable} with this {@link Subject} as the source, but using provided {@code unsubscribe}
   * to know when to stop managing new values.
   *
   * <pre>
   * Example:
   *
   *   @Injectable({
   *     providedIn: 'root'
   *   })
   *   export class MyComponentCommunicationService {
   *      public readonly myModelSubject: GenericSubject<MyModel>;
   *
   *     constructor() {
   *        this.myModelSubject = new GenericSubject<MyModel>();
   *     }
   *   }
   *
   *
   *   @Component({ ... })
   *   export class TestPurposeComponent implements OnInit, OnDestroy {
   *
   *      private unsubscribeAll: Subject<void>;
   *      private detectChanges$: Observable<MyModel>;
   *
   *      constructor(
   *        private myComponentCS: MyComponentCommunicationService
   *      ) {
   *         this.unsubscribeAll = new Subject<void>();
   *         this.detectChanges$ = this.myComponentCS.myModelSubject.asObservableUntil(this.unsubscribeAll);
   *      }
   *
   *      ngOnInit() {
   *        this.detectChanges$.subscribe((newValue: MyModel) => {
   *           ...
   *        });
   *      }
   *
   *      ngOnDestroy() {
   *         this.unsubscribeAll.next();
   *      }
   *   }
   * </pre>
   *
   * @param unsubscribe
   *   {@link Subject} used to unsubscribe all returned {@link Observable}s created from current {@link Subject}
   *
   * @returns {Observable} that the {@link Subject} casts to
   */
  asObservableUntil = (unsubscribe: Subject<void>): Observable<T> =>
    this.subject.asObservable()
      .pipe(
        takeUntil(unsubscribe)
      );


  /**
   * Sends provided {@code value} to the created {@link Observable}s from current {@link Subject}.
   *
   * @param value
   *    Data to send
   */
  next = (value: T): void =>
    this.subject.next(value);


  /**
   * Sends provided {@code error} to the created {@link Observable}s from current {@link Subject}.
   *
   * @param error
   *    Error to send
   */
  error = (error: any): void =>
    this.subject.error(error);

}

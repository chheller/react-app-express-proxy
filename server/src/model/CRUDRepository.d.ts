export interface CRUDRepository<P, Q = P> {
    create(params: Partial<P>): Promise<Q>;
    read(params: Partial<P>): Promise<Q[]>;
    update(params: Partial<P>): Promise<[number, ...Q[]]>;
    delete(params: P): boolean;
}

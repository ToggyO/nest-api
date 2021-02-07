export interface IMapper<TEntity, TModel, TDto> {
    mapToListOfDto(list: Array<TModel>): Array<TDto>;
    mapToDto(model: TModel): TDto;
    mapToOrmEntity(entity: TEntity): TModel;
}

import { TagDAO, tagsDAOType } from "../dao/tagsDao";
import { ProductTagsDAO } from '../dao/productTagsDao';

export const add = async (name: string, id: number): Promise<tagsDAOType> => {
    const result = await TagDAO.create({ name, producttagId: id });
    return result.toJSON() as tagsDAOType
}

export const remove = async (id: number): Promise<number> => {
    const result = await TagDAO.destroy({
        where: {
            id
        }
    })
    return result;
}

export const findAll = async (): Promise<tagsDAOType[]> => {
    const result = await TagDAO.findAll({
        include: [ProductTagsDAO]
    });
    return JSON.parse(JSON.stringify(result))
}

export const findAllTags = async (): Promise<tagsDAOType[]> => {
    const result = await ProductTagsDAO.findAll({
        include: [TagDAO]
    })
    return JSON.parse(JSON.stringify(result));
}

export const findByTagName = async (tag: string): Promise<tagsDAOType[]> => {
    const result = await TagDAO.findAll({
        where: {
            name: tag
        }
    })
    return JSON.parse(JSON.stringify(result));
}
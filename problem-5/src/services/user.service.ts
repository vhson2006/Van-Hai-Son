import {FindManyOptions, Like} from "typeorm"; 
import { User } from "../entities/user.entity";
import { DEFAULT_PAGE, DEFAULT_SIZE, MAX_RECORD_SIZE } from "../commons/consts";
import logger from "../commons/logger";
import { MyDataSource } from "../app-data-source";

export const getUsers = async (search: string = '', page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => {
  try {
    const userRepository = MyDataSource.getRepository(User)
    let queryObj: FindManyOptions = {
      skip: Math.min(size || DEFAULT_SIZE, MAX_RECORD_SIZE) * ((page || DEFAULT_PAGE) - 1),
      take: Math.min(size || DEFAULT_SIZE, MAX_RECORD_SIZE)
    }
    if (search) {
      queryObj = {
        ...queryObj, 
        where: [
          { name: Like(`%${search}%`) },
          { phone: Like(`%${search}%`) },
          { address: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
        ],
      }
    }

    const response = await userRepository.findAndCount(queryObj)
    return {
      data: response[0],
      total: response[1]  
    }
  } catch (e) {
    logger.log("error", `${String(e)} - ${JSON.stringify(e)}`)
    return {
      data: [],
      total: 0
    }
  }
}

export const getDetail = async (id: string) => {
  try {
    const userRepository = MyDataSource.getRepository(User)
    const entity = await userRepository.findOne({ where: { id } });
    if (!entity) {
      return { 
        status: false, 
      }
    }
    return { 
      status: true, 
      data: entity
    }
  } catch (e) {
    logger.log("error", `${String(e)} - ${JSON.stringify(e)}`)
    return { 
      status: false, 
    }
  }
}

export const createUser = async (name: string, phone: string, email: string, address: string) => {
  try {
    const userRepository = MyDataSource.getRepository(User)
    const { identifiers } = await userRepository.insert({
      name,
      phone,
      email,
      address
    });
    if (Array.isArray(identifiers) && identifiers.length > 0) {
      return {
        status: true
      }
    }
    return { 
      status: false, 
    }
  } catch (e) {
    logger.log("error", `${String(e)} - ${JSON.stringify(e)}`)
    return { 
      status: false, 
    }
  }
}

export const updateUser = async (id: string, name: string, phone: string, email: string, address: string) => {
  try {
    const userRepository = MyDataSource.getRepository(User)
    const { affected } = await userRepository.update(id, { name, phone, email, address });
    if (affected && affected > 0) {
      return { 
        status: true, 
      }
    }
    return { 
      status: false, 
    }
  } catch (e) {
    logger.log("error", `${String(e)} - ${JSON.stringify(e)}`)
    return { 
      status: false, 
    }
  }
}

export const deleteUser = async (id: string) => {
  try {
    const userRepository = MyDataSource.getRepository(User)
    const { affected } = await userRepository.softDelete(id);
    if (affected && affected > 0) {
      return { 
        status: true, 
      }
    }
    return { 
      status: false, 
    }
  } catch (e) {
    logger.log("error", `${String(e)} - ${JSON.stringify(e)}`)
    return { 
      status: false, 
    }
  }
}

import express, { Request, Response } from "express";
import { getUsers, getDetail, createUser, updateUser, deleteUser } from "../services/user.service";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export interface RequestParams {
  id: string;
}
export interface RequestBody {
  name: string;
  email: string;
  phone: string;
  address: string;
}
export interface RequestQuery {
  search: string;
  page: number;
  size: number;
}

const router = express.Router()
export const fetchUsers = async (req: Request<unknown, unknown, unknown, RequestQuery>, res: Response) => {
  const { query } = req
  const { search, page, size } = query
  const data = await getUsers(search, page, size)
  res.status(StatusCodes.OK).send(data)
}
router.get('/', fetchUsers)

router.get('/:id', async (req: Request, res: Response) => {
  const { params } = req;
  const { id } = params;
  const response = await getDetail(id)
  if (response.status === true) {
    res.status(StatusCodes.OK).send(response.data)
  } else {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
})

router.post('/', async (req: Request<unknown, unknown, RequestBody, unknown>, res: Response) => {
  const { body } = req
  const { name, phone, email, address } = body
  const response = await createUser(name, phone, email, address)
  if (response.status === true) {
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
  } else {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
})

router.patch('/:id', async (req: Request<RequestParams, unknown, RequestBody, unknown>, res: Response) => {
  const { params, body } = req;
  const { id } = params;
  const { name, phone, email, address } = body
  const response = await updateUser(id, name, phone, email, address)
  if (response.status === true) {
    res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED)
  } else {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { params } = req;
  const { id } = params;
  const response = await deleteUser(id)
  if (response.status === true) {
    res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED)
  } else {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
})


export default router
import { connect, disconnect } from '@/database'
import { Entry, IEntry } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}
| IEntry[]
| IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    const {
        id
    } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID' })
    }

    switch (req.method) {
        case 'GET':
            return getEntry(id, res)
        case 'PUT':
            return putEntry(id, req, res)
        case 'DELETE':
            return deleteEntry(id, res)
        default:
            return res.status(400).json({ message: 'Endpoint not found' })
    }
}

const getEntry = async (id: string | string[] | undefined, res: NextApiResponse<Data>) => {
    await connect()

    const entry = await Entry.findById(id)

    if (!entry) {
        await disconnect()
        return res.status(404).json({ message: 'Entry not found' })
    }

    await disconnect()

    return res.status(200).json(entry)
}

const putEntry = async (id: string | string[] | undefined, req: NextApiRequest, res: NextApiResponse<Data>) => {
    await connect()

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        await disconnect()
        return res.status(404).json({ message: 'Entry not found' })
    }

    const { 
        description = entryToUpdate.description,
        status = entryToUpdate.status, 
    } = req.body

    const updatedEntry = await Entry.findByIdAndUpdate(id, {
        description,
        status,
    }, { 
        runValidators: true,
        new: true,
     })

    await disconnect()

    return res.status(200).json(updatedEntry!)


}

const deleteEntry = async (id: string | string[] | undefined, res: NextApiResponse<Data>) => {
    await connect()

    const entryToDelete = await Entry.findById(id)

    if (!entryToDelete) {
        await disconnect()
        return res.status(404).json({ message: 'Entry not found' })
    }

    await Entry.findByIdAndDelete(id)

    await disconnect()

    return res.status(200).json({ message: 'Entry deleted' })

}
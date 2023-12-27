'use server'

import { initPocketBaseServer } from '../lib/pocketbase'

export async function createCollectionRecord(collectionName, data) {
  try {
    const pb = await initPocketBaseServer()
    return await pb.collection(collectionName).create(data)
  } catch (error) {
    console.log(`There was an issue creating a record in collection ${collectionName}: ${error}`)
    throw error
  }
}

export async function updateCollectionRecord(collectionName, recordId, data) {
  try {
    const pb = await initPocketBaseServer()
    return await pb.collection(collectionName).update(recordId, data)
  } catch (error) {
    console.log(`There was an issue updating a record in collection ${collectionName}: ${error}`)
    throw error
  }
}

export async function deleteCollectionRecord(collectionName, recordId) {
  try {
    const pb = await initPocketBaseServer()
    return await pb.collection(collectionName).delete(recordId)
  } catch (error) {
    console.log(`There was an issue deleting a record in collection ${collectionName}: ${error}`)
    throw error
  }
}

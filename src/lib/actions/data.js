'use server'

import { initPocketBaseServer } from '../pocketbase/initPocketBaseServer'

export async function createCollectionRecord({ collectionName, data }) {
  const pb = await initPocketBaseServer()

  await pb.collection(collectionName).create(data)
}

export async function updateCollectionRecord({ collectionName, recordId, data }) {
  const pb = await initPocketBaseServer()

  await pb.collection(collectionName).update(recordId, data)
}

export async function deleteCollectionRecord({ collectionName, recordId }) {
  const pb = await initPocketBaseServer()

  await pb.collection(collectionName).delete(recordId)
}

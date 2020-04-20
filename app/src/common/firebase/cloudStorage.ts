import { v4 as uuid } from 'uuid';
import { firebaseApp } from '../../services/firebase';

const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif'];

export async function uploadImageToCloudStorage(image: File): Promise<string> {
  const fileExtension = image.name.split('.').pop();
  if (!fileExtension || !SUPPORTED_IMAGE_FORMATS.includes(fileExtension)) {
    throw new Error(
      `file extension <${fileExtension}> does not match the supported formats: ${SUPPORTED_IMAGE_FORMATS}`
    );
  }

  const key = `images/${uuid()}.${fileExtension}`;

  const imageRef = firebaseApp.storage().ref(key);
  await imageRef.put(image);

  return key;
}

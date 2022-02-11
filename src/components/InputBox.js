import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { db } from '../../firebase'
import { collection, addDoc, setDoc, doc, updateDoc} from 'firebase/firestore' 
import { storage } from '../../firebase'
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

const InputBox = () => {
  const { data: session } = useSession()
  const inputRef = useRef(null)
  const filePickerRef = useRef(null)
  const [imageToPost, setImageToPost] = useState(null)



  const fullTime = Date.now()
  const today = new Date(fullTime).toUTCString()

  const sendPost = async (e) => {
    e.preventDefault()

    if (!inputRef.current.value) return

    const docData = {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: today,
    }

    await addDoc(collection(db, 'posts'), docData).then((docu) => {
      if (imageToPost) {

        const storageRef = ref(storage, `/posts/${docu.id}` );
        const uploadTask = uploadBytesResumable(storageRef, imageToPost)
        
        removeImage()

        uploadTask.on('state_shanged', (snapshot => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        })), (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
           async (url) =>{

              const docRef = doc(db, 'posts', docu.id)
              const updateTimestamp = await updateDoc(docRef, {
                timestamp: serverTimestamp()
            });

            }
          )
        }
      }
    })

    inputRef.current.value = ''
  }

  const addImageToPost = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className="mt-6 rounded-2xl bg-white p-2 font-medium text-gray-500 shadow-md">
      <div className="flex items-center space-x-4 p-4">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="flex-flow h-12 rounded-full bg-gray-100 px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex transform cursor-pointer flex-col filter transition duration-150 hover:scale-105 hover:brightness-110"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-center text-xs text-red-500">Remove</p>
          </div>
        )}
      </div>

      <div className="boder-t flex justify-evenly p-3">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="sm:text:sm text-xs xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon overflow-hidden"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm">Feeling Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox

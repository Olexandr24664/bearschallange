import { useState } from 'react'
import ReactModal from 'react-modal'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Photo } from '../../../../api'

type ItemProps = {
  photo: Photo
}

function Item({ photo }: ItemProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <div className="flex flex-col p-4 text-center hover:bg-gray-100">
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        className="mb-1 cursor-pointer"
        onClick={toggleModal}
      />
      <div className="my-2">{photo.title}</div>
      <a
        href={photo.url}
        download
        className="font-semibold hover:underline mt-auto"
      >
        Download
      </a>
      <ReactModal
        isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        ariaHideApp={false}
        role={'dialog'}
        preventScroll={true}
        parentSelector={() => document.body}
        className="w-full h-full"
      >
        <div className="w-full h-full py-6 px-2 flex flex-col justify-center items-center">
          <div className="text-center mb-2">
            <button onClick={toggleModal}>
              Close
              <AiFillCloseCircle className="inline-block ml-2" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <img src={photo.url} alt={photo.title} className="w-full"></img>
          </div>
        </div>
      </ReactModal>
    </div>
  )
}

export default Item

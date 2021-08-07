import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import useUser from '../../../../hooks/auth/useUser'
import useOnClickOutside from '../../../../hooks/shared/useClickOutside'

const Search = ({ thread, onSubmit, onMoreAction, onCloseThread }) => {
  const { isLoading, data, isError } = useUser()
  const ref = useRef()
  const [isModalOpen, setModalOpen] = useState(false)
  useOnClickOutside(ref, () => setModalOpen(false))

  const router = useRouter()
  if (isError) {
    router.push('/login')
  }
  if (isLoading) {
    return 'Loading...'
  }

  if (!data) {
    return null
  }

  return (
    <>
      <div className="search__box">
        <input
          className="search__box--input"
          placeholder="Search anything ... "
        />
      </div>
      <div className="search__user-info">
        <div onClick={() => setModalOpen(true)}>
          <Image
            src={data.avatarUrl}
            alt={data.firstName}
            width={30}
            height={30}
          />
        </div>
        {isModalOpen && (
          <div className="search__user-info--toggle-data" ref={ref}>
            <p
              onClick={() => {
                localStorage.clear()
                router.push('/login')
              }}
            >
              Sign out
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Search

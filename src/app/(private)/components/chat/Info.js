import { useEffect } from 'react'
import { Avatar } from 'flowbite-react'
import { useAppStore } from '#root/app/store'
import { useChatStore } from './store'
import { panelMap } from './panel/Container'
import useFetch from '#root/hooks/useFetch'
import useSocket from '#root/hooks/useSocket'
import { fetchRoomInfo } from '#root/api/room'

const Info = ({ roomId, setPanel }) => {
    const { setRoom } = useAppStore()
    const { info, setInfo, resetRoom } = useChatStore()
    const [dispatchInfo, roomInfo, isLoading, error] = useFetch()

    useEffect(() => {
        dispatchInfo(() => fetchRoomInfo(roomId))
    }, [roomId])

    useEffect(() => {
        if (!roomInfo) return
        setInfo(roomInfo)
    }, [isLoading])

    useSocket((socket, { REFRESH_ROOM_INFO }) => {
        socket.on(REFRESH_ROOM_INFO, ({ isRemoved, ...info }) => {
            if (isRemoved) {
                setRoom(null)
                resetRoom()
            } else {
                setInfo(info)
            }
        })
    })

    const getSubTitle = () => {
        if (false) {
            return 'Message youself'
        }
        return `Click here for ${info.type} info`
    }

    return (
        <div className='flex gap-4 items-center px-4 py-2 z-20 bg-stone-200 dark:bg-slate-800'>
            <Avatar
                rounded
                size='md'
                className='mr-auto justify-start cursor-pointer'
                onClick={() => setPanel(panelMap.ROOM_DETAIL.key)}
            >
                <div className='space-y-1'>
                    <div>{info.name}</div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>{getSubTitle()}</div>
                </div>
            </Avatar>

            <svg
                className='w-6 h-6 text-gray-800 dark:text-stone-200 cursor-pointer'
                aria-hidden='true'
                fill='none'
                viewBox='0 0 24 24'
                onClick={() => setPanel(panelMap.SEARCH_MESSAGE.key)}
            >
                <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeWidth='2'
                    d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                />
            </svg>
            {info.type === 'group' && (
                <svg
                    className='w-6 h-6 text-gray-800 dark:text-stone-200 cursor-pointer'
                    aria-hidden='true'
                    fill='none'
                    viewBox='0 0 24 24'
                    onClick={() => setPanel(panelMap.ADD_GROUP_MEMBER.key)}
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 12h14m-7 7V5'
                    />
                </svg>
            )}
        </div>
    )
}

export default Info
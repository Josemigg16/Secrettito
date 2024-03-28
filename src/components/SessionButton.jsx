function SessionButton({ className, Icon, onClick, children }) {



    return (
        <button
            onClick={() => onClick()}
            className={`${className} relative border-gray-200 border-2 rounded-full`}>
            <Icon
                className='absolute -left-[5.7rem] -top-[6.35rem]'
            />
            {children}
        </button>
    )
}

export default SessionButton

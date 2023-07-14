
interface ProfileCardProps {
    firstName?: string;
    lastName?: string;
    email?: string;
    setShowProfile: (showProfile: boolean) => void;
}



const ProfileCard = ({ firstName, lastName, email, setShowProfile }: ProfileCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 overflow-auto">
            <div className="bg-gray-800 flex items-center rounded-full h-24 w-full">
                <div className="right-10 absolute w-12 h-12 flex items-center justify-center"
                    onClick={() => setShowProfile(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <div className="bg-gray-800 flex flex-col items-center justify-center rounded-full h-24">
                <div className="text-white">
                    <text>{firstName} {lastName}</text> 
                </div>
                <div className="text-white">
                    <text>{email}</text>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;
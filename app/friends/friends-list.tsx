import { FriendCard } from '~/components/cards/friend'
import type { ImdbFriends } from '~/types/data'

export function FriendsList({ friends }: { friends: ImdbFriends[] }) {
  return (
    <div className="space-y-4 pt-2 md:space-y-6 md:pt-0">
      <div className="grid grid-cols-1 gap-4 gap-x-6 md:grid-cols-2">
        {friends.map((friend) => {
          return <FriendCard friend={friend} key={friend.name} />
        })}
      </div>
    </div>
  )
}

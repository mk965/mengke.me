import { FriendCard } from '~/components/cards/friend'
import type { ImdbFriends } from '~/types/data'

export function FriendsList({ friends }: { friends: ImdbFriends[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {friends.map((friend) => {
        return <FriendCard friend={friend} key={friend.name} />
      })}
    </div>
  )
}

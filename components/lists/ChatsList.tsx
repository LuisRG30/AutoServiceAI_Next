interface ChatsListProps {
  people: Array<{ name: string; latestMessage: string; image: string }>;
}

export default function ChatsList({ people }: ChatsListProps) {
  return (
    <ul role="list" className="divide-y divide-gray-200 max-w-2xl">
      {people.map((person) => (
        <li key={person.name} className="flex py-4 truncate">
          <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
          <div className="ml-3">
            <h1 className="text-base font-medium text-gray-900">
              {person.name}
            </h1>
            <h1 className="text-base text-gray-500 truncate">
              {person.latestMessage}
            </h1>
          </div>
        </li>
      ))}
    </ul>
  );
}

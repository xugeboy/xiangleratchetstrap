import Image from "next/image"

const people = [
    {
        name: 'Steven Chen',
        role: 'General Manager',
        year: '- Cofounder of Xianlge -',
        imageUrl:
      'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/steven_rmkwmp.png',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
    },{
        name: 'Sophia Liu',
        role: 'Sales Manager',
        year: '- Cofounder of Xianlge -',
        imageUrl:
        'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/sophia_mab7jt.png',
      bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
    },{
        name: 'Dustin Xu',
        role: 'Sales Assistant Manager',
        year: '- 5 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/dustin_io6avf.png',
        bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
      },{
        name: 'Warren Wu',
        role: 'Foreign Trade Sales',
        year: '- 9 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176225/warren_a8mhba.png',
        bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
      },{
        name: 'Alex Zuo',
        role: 'Foreign Trade Sales',
        year: '- 10 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/alex_bsu0jc.png',
        bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
      },{
        name: 'Chloe He',
        role: 'Foreign Trade Sales',
        year: '- 5 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176355/chloe_tv3t9c.png',
        bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
      }
  ]
  
  export default function Example() {
    return (
      <div id="meet-the-team" className="bg-white mb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-34l font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Meet our leadership
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              We are a team of experienced professionals, committed to driving excellence in manufacturing and providing top-quality solutions for our business partners.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {people.map((person) => (
              <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
                <Image alt="" src={person.imageUrl} 
                className="aspect-4/5 w-52 flex-none rounded-2xl object-cover"
                width={300}
                height={300}
                />
                <div className="flex-auto">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-base/7 text-gray-600">{person.role}</p>
                  <p className="text-base/7 text-gray-600">{person.year}</p>
                  <p className="mt-6 text-base/7 text-gray-600">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  
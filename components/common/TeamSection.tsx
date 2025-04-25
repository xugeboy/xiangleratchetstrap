import Image from "next/image"

const people = [
    {
        name: 'Steven Chen',
        role: 'General Manager',
        year: '- Cofounder of Xianlge -',
        imageUrl:
      'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/steven_rmkwmp.png',
    bio: 'Responsible for product development, Steven is a visionary leader and co-founder of Xianlge. Outside of work, he cherishes his role as the father of two daughters and two playful cats.',
    },{
        name: 'Sophia Liu',
        role: 'Sales Manager',
        year: '- Cofounder of Xianlge -',
        imageUrl:
        'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/sophia_mab7jt.png',
      bio: 'As Sales Manager and co-founder of Xianlge, Sophia brings extensive experience in building strong customer relationships and leading the sales team to success. At home, she is the loving mother of two daughters and two adorable cats.',
    },{
        name: 'Dustin Xu',
        role: 'Sales Assistant Manager',
        year: '- 5 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/dustin_io6avf.png',
        bio: 'Leading the foreign trade team, Dustin is also responsible for foreign trade business operations and market development at Xianlge. He has been a valuable member for 5 years, consistently supporting sales initiatives and fostering team collaboration.',
      },{
        name: 'Warren Wu',
        role: 'Foreign Trade Sales',
        year: '- 9 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176225/warren_a8mhba.png',
        bio: 'With 9 years of dedicated service in foreign trade sales at Xianlge, Warren possesses a deep understanding of international markets and excels at building lasting partnerships. In his free time, he enjoys playing basketball.',
      },{
        name: 'Alex Zuo',
        role: 'Foreign Trade Sales',
        year: '- 10 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176226/alex_bsu0jc.png',
        bio: 'Alex has been a key player in foreign trade sales for a decade, leveraging his extensive experience to navigate global markets and achieve remarkable results.',
      },{
        name: 'Chloe He',
        role: 'Foreign Trade Sales',
        year: '- 5 years at Xianlge -',
        imageUrl:
          'https://res.cloudinary.com/duimeqqch/image/upload/v1744176355/chloe_tv3t9c.png',
        bio: 'Chloe brings 5 years of experience in foreign trade sales to the Xianlge team, demonstrating a strong commitment to client satisfaction and driving international business growth.',
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
  
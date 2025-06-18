import Image from "next/image";
import { getTranslations } from "next-intl/server"; // 1. 导入
import { getCloudinaryPublicId } from "@/utils/formatUtils";



// 我们将把 name 和 imageUrl 保留在代码中，因为它们通常是固定的。
// role, year, bio, alt 将通过翻译键获取。
const peopleData = [
  {
    id: 'steven_chen', // 使用一个唯一的标识符
    name: 'Steven Chen', // 名字通常保持不变
    imageUrl: '/v1744176226/steven_rmkwmp.png',
    roleKey: 'people.steven.role',
    yearKey: 'people.steven.year',
    bioKey: 'people.steven.bio',
  },
  {
    id: 'sophia_liu',
    name: 'Sophia Liu',
    imageUrl: '/v1744176226/sophia_mab7jt.png',
    roleKey: 'people.sophia.role',
    yearKey: 'people.sophia.year',
    bioKey: 'people.sophia.bio',
  },
  {
    id: 'dustin_xu',
    name: 'Dustin Xu',
    imageUrl: '/v1744176226/dustin_io6avf.png',
    roleKey: 'people.dustin.role',
    yearKey: 'people.dustin.year',
    bioKey: 'people.dustin.bio',
  },
  {
    id: 'warren_wu',
    name: 'Warren Wu',
    imageUrl: '/v1744176225/warren_a8mhba.png',
    roleKey: 'people.warren.role',
    yearKey: 'people.warren.year',
    bioKey: 'people.warren.bio',
  },
  {
    id: 'alex_zuo',
    name: 'Alex Zuo',
    imageUrl: '/v1744176226/alex_bsu0jc.png',
    roleKey: 'people.alex.role',
    yearKey: 'people.alex.year',
    bioKey: 'people.alex.bio',
  },
  {
    id: 'chloe_he',
    name: 'Chloe He',
    imageUrl: '/v1744176355/chloe_tv3t9c.png',
    roleKey: 'people.chloe.role',
    yearKey: 'people.chloe.year',
    bioKey: 'people.chloe.bio',
  }
];


export default async function TeamSection() {
  const t = await getTranslations("TeamSection"); // 3. 获取翻译函数

  return (
    <div id="meet-the-team" className="bg-white mb-10 py-12 sm:py-16"> {/* Added some padding */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl lg:text-5xl"> {/* Adjusted font size classes */}
            {t("title")} {/* 4. 翻译标题 */}
          </h2>
          <p className="mt-6 text-lg/8 text-black">
            {t("description")} {/* 5. 翻译描述 */}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:max-w-4xl lg:gap-x-8 xl:max-w-none" // Adjusted margins and gaps
        >
          {peopleData.map((person) => (
            <li key={person.id} className="flex flex-col gap-6 xl:flex-row items-center xl:items-start"> {/* Centering items for better look */}
              <Image
                alt={t("peopleImageAlt", { name: person.name })} // 6. 翻译 alt 文本, 并传入 name
                src={person.imageUrl}
                className="aspect-4/5 w-52 flex-none rounded-2xl object-cover shadow-md" // Added shadow
                width={208} // w-52 is 208px
                height={260} // aspect-4/5 of 208px
              />
              <div className="flex-auto text-center xl:text-left"> {/* Centered text on small screens */}
                <h3 className="text-lg/8 font-semibold tracking-tight text-black">{person.name}</h3> {/* 名字不翻译 */}
                <p className="text-base/7 text-amber-700">{t(person.roleKey)}</p> {/* 翻译 role */}
                <p className="text-sm/6 text-black">{t(person.yearKey)}</p> {/* 翻译 year */}
                <p className="mt-4 text-base/7 text-black">{t(person.bioKey)}</p> {/* 翻译 bio */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
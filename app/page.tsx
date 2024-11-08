'use client'

// import Button from "@mui/material/Button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button"
import "material-symbols";
// import Button from "./components/button";
import NavRail from "./components/nav-rail";
import { NavItemData } from "./model/nav-item-data";
import TextButton from "./components/text-button";
import SearchBox from "./components/search-box";
import FilledButton from "./components/button";

const items: { [key: string]: NavItemData } = {
  'home': {
      text: 'Home',
      badgevalue: 0,
      onClick: () => {
          // setSelected(0);
          console.log('Home')
      },
      href: '#',
      type: 0
  },
  'library_music': {
      text: 'Your library',
      badgevalue: 0,
      onClick: () => {
          // setSelected(1);
          console.log('Your library')
      },
      href: '#',
      type: 0
  },
  'favorite': {
      text: 'Favorites',
      badgevalue: 0,
      href: '#',
      type: 0
  },
  'settings': {
      text: 'Settings',
      badgevalue: 0,
      href: '#',
      type: 0
  },
  // 'song1':{
  //   text: "Did you know",
  //   href: "#",
  //   img: {
  //     src: "https://en.wikipedia.org/wiki/Did_You_Know_That_There%27s_a_Tunnel_Under_Ocean_Blvd#/media/File:Lana_Del_Rey_-_Did_You_Know_That_There's_a_Tunnel_Under_Ocean_Blvd.png",
  //     width: 16,
  //   },
  //   type: 1
  // }
};

export default function Home() {
  return (
    <div className="home-page flex-col pb-4 h-screen items-start justify-stretch">
      <div className="app-bar flex pt-3 items-center justify-between w-full">
        <div className="nav-bar-button-container flex p-3 gap-3 items-center">
          <TextButton className="app-bar-button">
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </TextButton>
          <TextButton>
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </TextButton>
        </div>
        <div className="search-and-browse-container flex justify-center gap-4 flex-grow">
          <div className="search-and-browse-inner flex-grow flex items-center justify-center">
            <TextButton>
              <span className="material-symbols-outlined">
                browse
              </span>
            </TextButton>
            <SearchBox placeholder="Search" className="flex-grow" />
          </div>
        </div>
        <div className="nav-bar-button-container flex p-3 gap-3 items-center">
          <FilledButton showIcon={false}>
            Đăng nhập/Đăng ký
          </FilledButton>
        </div>
      </div>

      <div className="content flex p-4 pr-1 gap-4 self-stretch">
        <NavRail items={items} selected={0} />
        <div className="center-scroll max-h-[calc(100vh-120px]) overflow-y-scroll">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A sint, veniam dignissimos numquam accusamus impedit nisi est aliquid incidunt assumenda provident omnis vitae nostrum iste magni, saepe at perferendis! Numquam et sunt natus accusamus, dolorum vitae culpa quibusdam asperiores, animi officia blanditiis, reprehenderit debitis! Quia nobis, quisquam officia provident obcaecati quod suscipit quaerat cumque molestias unde iure qui odit, deserunt vitae nesciunt totam ducimus. Ipsam assumenda minus delectus culpa nostrum quaerat voluptates tempore tenetur reprehenderit dolorum, enim ea, maxime ut soluta incidunt blanditiis reiciendis cumque quod cum non sit! In eum sit voluptatibus rem neque accusamus maiores delectus nostrum quibusdam sint. Ea, quia. Illo dolores dicta quisquam quis placeat, magnam ducimus culpa quo perferendis iusto nostrum ullam temporibus incidunt asperiores suscipit quaerat amet? Officia unde perspiciatis assumenda enim voluptates tempore excepturi laudantium quod. Nisi non eligendi cum expedita? Velit cupiditate minus, illo libero beatae, dicta fugiat numquam consectetur quod hic possimus. Fugiat inventore dolore repudiandae minus deserunt modi consequatur ex nam quae. Officiis, eum aliquam ad odio fuga voluptatibus placeat labore repellendus modi quia vel, ipsam tenetur, eveniet odit accusantium itaque architecto est non blanditiis? Nobis porro quos ad, quibusdam ullam sapiente et maiores eum, quidem, deserunt quas fugit temporibus repellat assumenda sequi dolorum placeat? Molestiae in aspernatur ad voluptas placeat deleniti deserunt eligendi suscipit perspiciatis quisquam dolorem nisi cumque commodi explicabo amet, expedita, laborum obcaecati unde nobis! Tenetur nostrum neque libero, praesentium repellat voluptatem delectus illum itaque molestiae excepturi vero totam optio enim, quas, doloribus aut explicabo exercitationem ex. Vero voluptatem, reiciendis voluptatum dolorem modi ut fugit aspernatur minima. Ipsa aperiam officiis minus beatae eius! Dolor nam possimus sequi inventore itaque sed asperiores doloremque pariatur repellendus doloribus, consequuntur natus animi similique repellat eius ea sint quas omnis quos in aliquam ab laudantium repudiandae eum. Necessitatibus officia laboriosam perferendis. Eaque vero amet atque iste nisi eligendi fugiat nobis ullam voluptate est assumenda non a unde numquam possimus culpa hic corrupti, deleniti in consequatur blanditiis consequuntur asperiores adipisci. Aliquam quos illum sequi nam facilis non quibusdam odio, nihil quia quasi ab asperiores eveniet? Sunt quidem saepe omnis quas maiores similique at eveniet eius deserunt magnam facilis, veritatis expedita corporis ea repudiandae doloribus animi vitae sint veniam exercitationem non nam quam ipsa. Natus quis deserunt culpa possimus minima iure ipsam molestiae asperiores, nihil totam facilis recusandae accusamus sed ex blanditiis. Fuga vero sint pariatur est, quisquam soluta ipsa architecto exercitationem eum rem ullam ipsum laudantium molestias consequuntur voluptatum officia iure debitis. Porro distinctio doloremque earum laudantium dolorem et, quo ad. Doloribus velit sed labore soluta eos pariatur placeat quod quisquam veniam nam sint quae deserunt, eaque debitis ut odit facilis enim ea nulla. Minima nam, maiores non nihil quos beatae dicta pariatur placeat! Beatae delectus dolorum explicabo autem est, esse nam optio consectetur quia, obcaecati laboriosam laborum dicta ea omnis sapiente ullam nulla soluta iste saepe velit fugit modi ut? Quidem minus tempore fuga, obcaecati id rerum sed nulla necessitatibus itaque amet esse optio molestias reprehenderit suscipit minima asperiores aliquid totam. Suscipit.
          </p>
        </div>
      </div>
    </div>
  );
}

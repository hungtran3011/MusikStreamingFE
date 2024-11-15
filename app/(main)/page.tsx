// import Button from "@mui/material/Button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button"
import "material-symbols";
import TextButton from "../components/buttons/text-button";
import Image from "next/image";
import VerticalCard from "../components/info-cards/vertical-card";
import HorizontalCard from "../components/info-cards/horizontal-card";
// import { metadata } from "./layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MusikStreaming | Home",
  description: "New music streaming app, using Material Design",
};

export default function Home() {
  return (
    // <div className="flex-col self-stretch items-end justify-between h-screen">
    //   <div className="center-scroll flex-grow">
    //     <div className="center-scroll-inner flex items-center h-full">
          // <div className="center-scroll-inner flex items-start h-full bg-[--md-sys-color-surface-container-low] rounded-xl px-4 py-6">
            // <div className="flex-col">
            <div className="flex-col w-full gap-4">
              <div className="card-no-scroll grid grid-cols-2 lg:grid-cols-4 gap-4">
                <HorizontalCard/>
                <HorizontalCard/>
                <HorizontalCard/>
                <HorizontalCard/>
                <HorizontalCard/>
                <HorizontalCard/>
                <HorizontalCard/>
                <HorizontalCard/>
              </div>
              <div className="card-scroll flex overflow-x-hidden">
                <div className="card-scroll-inner flex gap-4 overflow-x-scroll">
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                </div>
              </div>
              <div className="card-scroll flex overflow-x-hidden">
                <div className="card-scroll-inner flex gap-4 overflow-x-scroll">
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                </div>
              </div>
              <div className="card-scroll flex overflow-x-hidden">
                <div className="card-scroll-inner flex gap-4 overflow-x-scroll">
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                </div>
              </div>
              <div className="card-scroll flex overflow-x-hidden">
                <div className="card-scroll-inner flex gap-4 overflow-x-scroll">
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                </div>
              </div>
              <div className="card-scroll flex overflow-x-hidden">
                <div className="card-scroll-inner flex gap-4 overflow-x-scroll">
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                  <VerticalCard/>
                </div>
              </div>
            </div>
              // <p className="text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus aliquid, quaerat et itaque distinctio iure impedit ipsa possimus consequatur rem, excepturi laudantium tenetur praesentium perferendis ab doloribus quae quos quo quam ullam libero autem sit repudiandae. Rerum impedit cupiditate iusto accusamus, quibusdam porro rem consequatur maxime reiciendis voluptatum. Tempora obcaecati quis labore! Eveniet, perferendis corporis quidem officia quam odio culpa aspernatur nobis ducimus, hic similique quo possimus numquam itaque accusamus. Quo, quidem eligendi labore doloribus dolorem qui doloremque eveniet expedita omnis assumenda voluptatibus magni delectus? Minus, dolore, vero earum hic quae similique quidem mollitia eos non numquam vel nam quas eaque fuga aperiam necessitatibus molestiae, temporibus consequatur consequuntur molestias ipsa est! Similique, adipisci! Aliquid quisquam dolores dolorum, id officia quaerat cum vel sint pariatur excepturi porro nostrum voluptatem harum, autem sit laboriosam quas tenetur assumenda, iusto molestias quibusdam recusandae. Neque deserunt, temporibus corporis ratione facere non dolorem vitae quo vero assumenda, eum, autem dolores deleniti dolorum velit quae architecto? Inventore eaque odit repellendus alias quibusdam doloremque esse ut eos possimus numquam. Animi esse aut voluptatem corrupti quod praesentium nihil quibusdam, ab laborum veritatis cupiditate temporibus dignissimos dolores, quia dolor ad porro! Omnis aliquid maiores, voluptatum ab corporis nostrum molestias natus officia temporibus, labore aliquam sunt dicta, quae at? Repudiandae nostrum rem fugiat animi. Minus aspernatur repellendus vel neque facilis dolorem assumenda fugiat necessitatibus, dicta explicabo, veritatis dolores enim harum, dolor dolore odit omnis! Placeat dolorum eum minima, voluptate perferendis magnam doloribus reiciendis ullam unde similique dignissimos possimus maiores porro corrupti. Aperiam atque natus dolor soluta veritatis eaque necessitatibus optio impedit quaerat corporis? A enim, consequuntur nam quia natus sint ratione, minima fugiat assumenda blanditiis doloribus reprehenderit dolor quos, voluptatem placeat officiis quam! Voluptatem fugit, voluptatibus explicabo provident alias voluptate id perspiciatis aspernatur, libero tempora labore animi, cupiditate suscipit natus. Dignissimos dolor est quam at adipisci laborum tempore harum natus eum eos. Mollitia, minus dolor aliquid dolorum perspiciatis nulla vitae adipisci consectetur dignissimos perferendis obcaecati. Maxime hic cumque doloribus, veniam magnam nihil recusandae voluptatibus? Maiores numquam possimus eius error iure voluptatum consequuntur eos aspernatur quod officiis! Corrupti sunt dolores a natus quia molestiae, dicta omnis velit beatae minus optio nam officia ex dolore est saepe voluptate odio animi. Dicta omnis, officiis qui officia modi possimus cum ab, laborum accusantium vero deleniti ipsa, adipisci dolore veritatis incidunt quaerat assumenda! Maxime, soluta. Officia non officiis incidunt quae. Illum debitis deserunt soluta adipisci necessitatibus vel dolor quas recusandae tempore, omnis, tempora asperiores esse blanditiis maxime architecto dolores! Quas est aperiam rerum nisi itaque inventore harum tenetur quae minus neque exercitationem, natus similique, earum numquam quis, maxime qui reiciendis quasi! Omnis, voluptates nihil earum recusandae maiores unde accusamus. Provident quod repellat hic accusamus natus illo soluta, nisi fugiat aspernatur omnis esse autem reiciendis similique suscipit aut? Iste veritatis ipsa amet laudantium dicta unde! Molestias illo corrupti eligendi! Velit fugit sapiente est? Vero quae dolorem voluptatum eaque a voluptate, numquam quidem similique ad excepturi distinctio sunt porro obcaecati adipisci quibusdam non aspernatur itaque iure facere! Quo totam dolores accusamus repudiandae recusandae esse voluptas minima iusto aperiam sit quos quisquam, explicabo deserunt magnam possimus ratione placeat quam, culpa autem. Ullam possimus quos odio enim beatae animi quaerat incidunt nihil maiores culpa ut, adipisci aut error libero totam tempore nobis dolorum voluptatum rerum itaque eos ducimus reprehenderit praesentium iste? Cumque consequuntur libero labore sapiente. Cumque natus tenetur saepe iste exercitationem rerum iusto similique, at accusantium eaque voluptate! Ex soluta accusantium accusamus aspernatur minus repudiandae corrupti autem dicta, adipisci sapiente vero nulla vel odio magnam expedita impedit facilis excepturi delectus? Velit cumque quod laborum fugit facere ipsum culpa mollitia. Reprehenderit ad delectus saepe aliquid eius ut, assumenda nisi illo iste cum cumque dolorem distinctio consequuntur doloremque itaque labore provident dignissimos. Eos magni, distinctio ea fugit adipisci commodi quia qui maxime eius ducimus. Ea repudiandae numquam hic recusandae harum excepturi laborum, eius minima facilis velit ipsa a architecto voluptatibus praesentium, quae aperiam corporis maxime accusamus ad quisquam voluptate? Molestiae ut dolor ea! Culpa inventore laborum error molestiae veritatis numquam iste. Quos fuga cupiditate id eaque fugiat modi at blanditiis! Suscipit cupiditate laboriosam unde inventore reprehenderit mollitia accusamus provident esse architecto, explicabo minima voluptas quaerat natus earum perspiciatis? Aut recusandae consequuntur facere sint commodi autem deleniti adipisci nihil voluptatibus voluptatem placeat, molestiae debitis. Laudantium illum aliquam consectetur, dicta suscipit repellendus maiores facilis vel ullam cum aperiam esse debitis ea dolorem animi. Doloremque debitis maxime, natus itaque quidem soluta necessitatibus eveniet sed odit voluptatum ratione, saepe non porro quia asperiores exercitationem nobis, facere blanditiis. Nobis autem vero accusantium ratione repellendus incidunt provident quod veniam dolores facere ab voluptate, doloribus nihil totam magnam! Asperiores ipsa quos porro impedit! Cum quod praesentium sit! Facere blanditiis asperiores officiis deserunt quidem harum quisquam nihil, laborum quod consectetur illum unde tempore, magni porro fugiat natus velit suscipit optio quibusdam quasi temporibus? Odit at rerum amet explicabo aliquid beatae delectus quaerat adipisci molestias, vel laudantium quasi assumenda, ipsum tempora voluptatibus neque? Quibusdam, laudantium laboriosam? Aliquid totam accusamus vel, temporibus eum nostrum tempore repellat quidem illum unde nisi! Nihil atque placeat quod magni deleniti itaque ipsam consectetur. Ad recusandae at ratione a, veritatis doloremque necessitatibus ducimus maxime aspernatur? Neque dolorem natus quas quae at nam aliquid molestias quidem, doloremque cumque quasi similique provident qui quos beatae eaque alias optio dignissimos. Excepturi qui molestiae amet quaerat expedita natus! Reiciendis hic quaerat sint voluptatem ducimus corrupti non, perferendis facere consectetur et voluptatum quia reprehenderit neque quasi tempore sequi minima corporis modi sed voluptates aspernatur molestiae? Provident, ratione. Quis quod eius veniam saepe iste magni error sint blanditiis sapiente, tempore facere architecto enim doloremque quibusdam dolores ratione molestias, suscipit hic obcaecati dolor voluptates maiores odio vero! Totam, excepturi? Aperiam corporis at mollitia! Fugit quidem quos magnam accusantium consequuntur beatae. Eos ex molestias reprehenderit quasi perspiciatis eveniet, amet aspernatur totam? Ipsam perferendis adipisci ad, eius voluptatem quos sed dolorem dolore est ducimus odit labore asperiores odio modi laborum tempore. Vitae mollitia soluta odit. Cumque rerum distinctio voluptates aliquam ullam nam blanditiis vitae temporibus!</p>
            // </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="song-playing z-[1000] bg-[--md-sys-color-inverse-on-surface] p-4 gap-4 flex flex-grow-0 items-center justify-center self-end">
    //     <div className="song-title flex items-center gap-2 w-1/6">
    //       <Image src={"/favicon.ico"} alt="song-playing" width={64} height={64} />
    //       <div className="song-title-info">
    //         <p className="song-title-text">Song title</p>
    //         <p className="song-artist">Artist</p>
    //       </div>
    //       <span className="material-symbols-outlined">favorite</span>
    //     </div>
    //     <audio src="" controls className=""></audio>
    //     <div className="song-controls-container flex-col flex-grow">
    //       <div className="song-controls flex items-center justify-center gap-4">
    //         <TextButton>
    //           <span className="material-symbols-outlined">skip_previous</span>
    //         </TextButton>
    //         <TextButton>
    //           <span className="material-symbols-outlined">play_arrow</span>
    //         </TextButton>
    //         <TextButton>
    //           <span className="material-symbols-outlined">skip_next</span>
    //         </TextButton>
    //       </div>
    //       <div className="song-progress flex items-center gap-4">
    //         <p>0:00</p>
    //         <div className="song-progress-bar flex-grow bg-[--md-sys-color-on-surface] h-1 rounded-full overflow-clip">
    //           <div className="song-progress-bar-inner bg-[--md-sys-color-primary] h-full rounded-full"></div>
    //         </div>
    //         <p>3:00</p>
    //       </div>
    //     </div>
    //     <div className="right-controls w-1/6 flex">
    //       <TextButton>
    //         <span className="material-symbols-outlined">volume_up</span>
    //       </TextButton>
    //       <TextButton>
    //         <span className="material-symbols-outlined">queue_music</span>
    //       </TextButton>
    //     </div>
    //   </div>
    // </div>
  );
}

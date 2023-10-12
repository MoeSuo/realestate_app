import Image from "next/image";
import Layout from "./layout";
import defaultImage from "../../../public/img/left-box.jpg"
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
export default function LayoutLeftImage({ children}) {

  return (
    <Layout>
      <div className={roboto.className}>

      
      <div className=" flex h-screen w-screen">
        {/* <div className="relative hidden lg:flex lg:w-1/2">
          <Image
            src={image || defaultImage}
            alt="bacground image"
            priority
            style={{ objectFit: "cover" }}
          />
        </div> */}

        <div className="relative flex  items-center justify-center w-full p-4 overflow-y-scroll index-10">
          {children}
        </div>
      </div>
      </div>
    </Layout>
  );
}

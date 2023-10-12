import Link from "next/link";
import {
  BsBadgeVrFill,
  BsFillBadge3DFill,
  BsFillDatabaseFill,
  BsFillPeopleFill,
  BsPersonGear,
} from "react-icons/bs";

export default function Main() {
  return (
    <section className="text-gray-600 body-font gradient-background">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <h1 className="text-80 text-center text-6xl leading-extra-80 uppercase lh-6 ld-04 font-bold text-white mb-6">
          THE FUTURE OF PROPERTY TRANSACTIONS
        </h1>
        <h2 className="text-xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-400 text-center leading-[2rem] ">
          INTRODUCING THE FUTURE OF PROPERTY TRANSACTIONS<br></br>
          WITH OUR CUTTING-EDGE REAL ESTATE <br></br>
          INTERACTIVE SALES APP
          <br />
        </h2>
        <div href="/app" className="ml-6 text-center">
          {/* <Link
            className="inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-opacity-70 bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline"
            href="/index.htm"
          >
            Go to App
          </Link> */}
          <Link
            className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline"
            href="/index.htm" target="_blank"
          >
            Demo
          </Link>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-center mx-auto">
        <img
          className="object-cover object-center w-3/4 mb-10  shadow-md g327 mix-blend-normal"
          alt="Placeholder Image"
          src="../../../img/home_bg_002.jpg"
        ></img>
      </div>
      <h2 className=" pt-40 px-20 lg:leading-extra-80 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-5xl md:text-6xl">
        Experience Real Estate Like Never Before
      </h2>
      <br></br>
      <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
        powered by state-of-the-art web 3D technology.
      </p>
      <div
        id="feature"
        className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3"
      >
        <div className="ktq4 my-8">
          {/* <img className="w-10" src="https://nine4.app/favicon.png"></img> */}
          <BsFillBadge3DFill className="text-white w-14 h-14" />
          <h3 className="pt-3 font-semibold text-lg text-white">
            Web 3D Technology:
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Step into the future of real estate with our advanced web 3D
            technology. Explore properties in breathtaking detail, from every
            angle and corner, giving you an unprecedented view of your potential
            new home.
          </p>
        </div>
        <div className="ktq4 my-8">
          {/* <img className="w-10" src="https://nine4.app/favicon.png"></img> */}
          <BsBadgeVrFill className="text-white w-14 h-14" />
          <h3 className="pt-3 font-semibold text-lg text-white">VR Support:</h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Take your property exploration to the next level with virtual
            reality support. Slip on your VR headset, and you'll feel like
            you're actually walking through your dream home, making it easier
            than ever to make confident decisions.
          </p>
        </div>
        <div className="ktq4 my-8">
          {/* <img className="w-10" src="https://nine4.app/favicon.png"></img> */}
          <BsFillDatabaseFill className="text-white w-14 h-14" />
          <h3 className="pt-3 font-semibold text-lg text-white">
            Fully Self-Contained CRM:
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Managing your real estate transactions has never been easier. Our
            app includes a fully self-contained Customer Relationship Management
            (CRM) system, allowing you to keep track of leads, communications,
            and transactions seamlessly.
          </p>
        </div>
        <div className="ktq4 my-8">
          {/* <img className="w-10" src="https://nine4.app/favicon.png"></img> */}
          <BsPersonGear className="text-white w-14 h-14" />
          <h3 className="pt-3 font-semibold text-lg text-white">
            Admin Dashboard:
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            For real estate professionals, our powerful admin dashboard provides
            a comprehensive view of your listings, analytics, and user
            interactions. Stay in control of your real estate business like
            never before.
          </p>
        </div>
        <div className="ktq4 my-8">
          {/* <img className="w-10" src="https://nine4.app/favicon.png"></img> */}
          <BsFillPeopleFill className="text-white w-14 h-14" />
          <h3 className="pt-3 font-semibold text-lg text-white">
            User-Friendly Front Page:
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Our user-friendly interface ensures that finding your dream home is
            a breeze. Browse listings, save your favorites, and schedule
            viewings with just a few clicks.
          </p>
        </div>
      </div>
      <div className="pt-32 pb-32 max-w-6xl mx-auto fsac4 md:px-1 px-3">
        <img src="https://cdn.pixabay.com/photo/2022/01/03/19/28/castle-6913460_1280.jpg"></img>
        <div className="ktq4 py-8">
          <h3 className="pt-3 font-semibold text-lg text-white">
            Join the Future of Real Estate Today!
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Don't miss out on the opportunity to be part of the future of real
            estate. Whether you're a buyer looking for your dream home or a real
            estate professional seeking innovative ways to serve your clients,
            our Real Estate Interactive Sales App has everything you need.
          </p>
        </div>
        <div className="ktq4 py-8">
          <img src="https://nine4.app/images/nine4-3.png"></img>
          <h3 className="pt-3 font-semibold text-lg text-white">
            Don't miss out on the opportunity to be part of the future of real
            estate.
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Don't miss out on the opportunity to be part of the future of real
            estate. Whether you're a buyer looking for your dream home or a real
            estate professional seeking innovative ways to serve your clients,
            our Real Estate Interactive Sales App has everything you need. Ready
            to explore properties like never before? Sign up now and take your
            first step towards finding your perfect home in the most immersive
            way possible. Your dream home awaits – embrace the future of real
            estate today!
          </p>
        </div>
      </div>
      <section className="relative pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-200">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              type="email"
              placeholder="jack@example.com"
              name="email"
              autoComplete="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
            />{" "}
            <Link
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/"
            >
              <span className="justify-center">Subscribe</span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

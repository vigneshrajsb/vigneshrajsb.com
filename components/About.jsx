import React from "react";

const About = () => {
  return (
    <div id="about" className="w-full md:h-screen p-2 flex items-center py-16">
      <div className="=max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#e06e4d]">
            About
          </p>
          <h2 className="py-4">Who I Am?</h2>
          <p className="py-2 text-gray-600">
            A Software Engineer based in Los Angeles.
          </p>
          <p className="py-2 text-gray-600">
            Here comes my life story that no one asked for. Here comes my life
            story that no one asked.
          </p>
          <p className="py-2 text-gray-600">
            Here comes my life story that no one asked for. Here comes my life
            story that no one asked for. Here comes my life story that no one
            asked for.
          </p>
          <p className="py-2 text-gray-600 underline cursor-pointer">
            See what I&apos; working on
          </p>
        </div>
        <div className="w-full h-full m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-xl"
            alt="laptop on top of a desk with a small plant to its side"
            src="https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

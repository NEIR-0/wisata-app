function Navbar() {
    return (
      <nav className="w-full h-14 bg-white flex items-center justify-center border-b-[1px] shadow-sm">
        <div className="w-full flex items-center justify-around">
          <h1 className="text-2xl font-bold text-black">Diary Apps</h1>
          <button className="py-1.5 px-5 text-white bg-blue-500 rounded-md text-base font-normal">Sign In</button>
        </div>
      </nav>
    );
}

export default Navbar;

const AppHeader = () => {
  return (
    <header className="flex items-center gap-x-1 absolute top-0 left-0 w-full p-2 box-border bg-header-400">
      <button className="bg-red-500 rounded-full w-4 h-4" id="close" />
      <button className="bg-yellow-500 rounded-full w-4 h-4" id="minimize" />
      <button className="bg-green-500 rounded-full w-4 h-4" id="maximize" />
    </header>
  );
};

export default AppHeader;

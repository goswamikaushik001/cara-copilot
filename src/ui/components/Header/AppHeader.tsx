const AppHeader = () => {
  const handleAction = (action: FrameWindowAction) =>
    window.electron.sendFrameAction(action);

  return (
    <header className="flex items-center gap-x-1 absolute top-0 left-0 w-full p-2 box-border bg-header-400">
      <button
        className="bg-red-500 hover:border hover:border-white rounded-full w-5 h-5"
        id="close"
        onClick={() => handleAction("CLOSE")}
      />
      <button
        className="bg-yellow-500 hover:border hover:border-white rounded-full w-5 h-5"
        id="minimize"
        onClick={() => handleAction("MINIMIZE")}
      />
      <button
        className="bg-green-500 hover:border hover:border-white rounded-full w-5 h-5"
        id="maximize"
        onClick={() => handleAction("MAXIMIZE")}
      />
    </header>
  );
};

export default AppHeader;

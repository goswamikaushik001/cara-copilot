const AppHeader = () => {
  const handleAction = (action: FrameWindowAction) =>
    window.electron.sendFrameAction(action);

  return (
    <header className="flex items-center gap-x-1 absolute top-0 left-0 w-full p-2 box-border bg-header-400">
      <button
        className="bg-red-500 hover:border-2 hover:border-white rounded-full w-4 h-4"
        id="close"
        onClick={() => handleAction("CLOSE")}
      />
      <button
        className="bg-yellow-500 hover:border-2 hover:border-white rounded-full w-4 h-4"
        id="minimize"
        onClick={() => handleAction("MINIMIZE")}
      />
      <button
        className="bg-green-500 hover:border-2 hover:border-white rounded-full w-4 h-4"
        id="maximize"
        onClick={() => handleAction("MAXIMIZE")}
      />
    </header>
  );
};

export default AppHeader;

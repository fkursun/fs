// Please update this type as same as with the data shape.
type List = Array<{
  id: string;
  name: string;
  files: Array<{
    id: string;
    name: string;
  }>;
}>;

export default function move(list: List, source: string, destination: string): List {
  const sourceFiles = [...list];
  // get reference of list, so we won't corrupt original array.
  const destinationFiles = [...list];
  // get source file which will be moved.
  let fileToBeMoved: Array<{ id: string; name: string }> = [];
  sourceFiles.forEach((file: { files: Array<{ id: string; name: string }> }) => {
    if (
      fileToBeMoved.length === 0 &&
      file.files.findIndex((item: { id: string }) => item.id === source) !== -1
    ) {
      fileToBeMoved = file.files.splice(
        file.files.findIndex((item: { id: string }) => item.id === source),
        1,
      );
    }
  });
  const fileWillBePlaced = destinationFiles.findIndex(
    (item: { id: string }) => item.id === destination,
  );
  // throw an error when source file could not detect.
  if (fileToBeMoved.length === 0) throw new Error('You cannot move a folder');
  if (fileWillBePlaced === -1) throw new Error("You cannot specify a file as the destination'");
  list[fileWillBePlaced].files.push(fileToBeMoved[0]);
  return list;
}

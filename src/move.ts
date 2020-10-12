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
  const sourceFiles = list[0].files;
  // get reference of list, so we won't corrupt original array.
  const destinationFiles = [...list];
  // get source file which will be moved.
  const fileToBeMoved = sourceFiles.findIndex((item: { id: string }) => item.id === source);
  const fileWillBePlaced = destinationFiles.findIndex(
    (item: { id: string }) => item.id === destination,
  );
  // throw an error when source file could not detect.
  if (fileToBeMoved === -1) throw new Error('You cannot move a folder');
  // get corresponding element from source, store it in variable and remove it from current array.
  const sourceItem = sourceFiles.splice(
    sourceFiles.findIndex((item: { id: string }) => item.id === source),
    1,
  );
  if (fileWillBePlaced === -1) throw new Error("You cannot specify a file as the destination'");
  list[fileWillBePlaced].files.push(sourceItem[0]);
  return list;
}

import Link from "next/link";

export default function ChecklistTable({
  checklistData,
  handleCheck,
  isChecked,
}) {
  return (
    <div className="text-mw_black mx-auto px-16">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xl">
            <th className="p-4">Step</th>

            <th className="p-4">Task</th>

            <th className="p-4">Details</th>

            <th className="p-4">Webpage</th>

            <th className="p-4">Completed</th>
          </tr>
        </thead>

        <tbody>
          {checklistData.map((item) => (
            <tr key={item.step}>
              <td className="text-center border-2 border-black px-4 py-2">
                {item.step}.
              </td>

              <td className="border-2 border-black px-4 py-2">{item.task}</td>

              <td className="border-2 border-black px-4 py-2">
                {item.details}
              </td>

              <td className="border-2 border-black px-4 py-2">
                <div
                  className="bg-mw_green text_mw-black text-center rounded p-2 hover:bg-mw_olive
                                        transition duration-150 ease-in-out cursor-pointer"
                >
                  <Link href={item.webpageLink}>Visit Webpage</Link>
                </div>
              </td>

              <td className="text-center border-2 border-black px-4 py-2">
                <input
                  type="checkbox"
                  checked={isChecked(item.step)}
                  onChange={() => handleCheck(item.step)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

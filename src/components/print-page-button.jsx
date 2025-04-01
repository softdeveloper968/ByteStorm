export default function PrintPageButton() {
    function handlePrint() {
        window.print()
    }

    return (
        <button
            className="bg-white text-center text-mw_black border-2 border-mw_black rounded-xl w-36 p-1 cursor-pointer hover:bg-mw_gray"
            onClick={handlePrint}
        >
            Print Page
        </button>
    );
};

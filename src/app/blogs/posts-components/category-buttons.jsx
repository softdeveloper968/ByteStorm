export default function CategoryButtons({ setCategory }) {

    const topics = [
        {
            name: "All Posts",
            value: "allPosts",
            id: "category-1",
            default: true
        },
        {
            name: "Home Buyer",
            value: "Home Buyer",
            id: "category-2",
            default: false
        },
        {
            name: "Home Seller",
            value: "Home Seller",
            id: "category-3",
            default: false
        },
        {
            name: "Agent",
            value: "Agent",
            id: "category-4",
            default: false
        },
        {
            name: "Lender",
            value: "Lender",
            id: "category-5",
            default: false
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {topics.map((topic) => (
                <div key={topic.id}>
                    {topic.default ?
                        <input
                            className="sr-only peer"
                            type="radio"
                            value={topic.value}
                            name="category"
                            id={topic.id}
                            defaultChecked
                        />
                        :
                        <input
                            className="sr-only peer"
                            type="radio"
                            value={topic.value}
                            name="category"
                            id={topic.id}
                        />
                    }

                    <label
                        className="
                            flex
                            text-base
                            justify-center
                            items-center
                            text-center
                            text-mw_black 
                            border-2
                            border-transparent
                            hover:text-mw_olive
                            peer-checked:text-mw_red
                            peer-checked:border-b-mw_red
                            cursor-pointer
                        "
                        htmlFor={topic.id}
                        onClick={() => setCategory(topic.value)}
                    >
                        {topic.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

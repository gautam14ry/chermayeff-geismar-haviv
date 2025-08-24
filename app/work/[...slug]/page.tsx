import PreContent from "@/app/components/preconnect/PreContent"
import Works from "@/app/components/works/Works"

interface Props {
    params: { slug: string[] };
}

const WorkPage = async ({ params }: Props) => {
    const { slug } = await params;

    const filterType = (() => {
        if (slug[0] === "logos") return "logo";
        if (slug[0] === "graphics") return "graphic";
        if (slug[0] === "art-in-architecture") return "art-in-architecture";
        return "logo";
    })();

    const sortType = (() => {
        if (slug[1] === "az") return "az";
        if (slug[1] === "new") return "new";
        return "curated";
    })();

    return (
        <main id={`work/${slug[0]}`} className="pageType-workCollection">
            <div className="workCollection">
                <div className="content--container workCollection--container">
                    <PreContent filterType={slug[0]} />
                    <div className="js-fade__slow">
                        <Works type={filterType} sort={sortType} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default WorkPage
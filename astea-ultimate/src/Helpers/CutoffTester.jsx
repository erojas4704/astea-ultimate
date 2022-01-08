export default function CutoffTester() {
    return (<>
        <div className="d-sm-none d-block">XS</div>
        <div className="d-none d-sm-block d-md-none">SM</div>
        <div className="d-none d-md-block d-lg-none">MD</div>
        <div className="d-none d-lg-block d-xl-none">LG</div>
        <div className="d-none d-xl-block">XL</div>
    </>)
}
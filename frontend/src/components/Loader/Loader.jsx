function Loader({loaderWidth}) {
    return <div className=" flex items-center justify-center max-7-wl mx-auto p-4 mt-6">
        <span className={`loading loading-spinner text-success ${loaderWidth}`}></span>
    </div>
}

export default Loader
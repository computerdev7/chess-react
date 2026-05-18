export default function RenderAlert({setShowRenderAlert}){
    return (
        <>
        <div className="w-500 h-300 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-blue-500 p-5">
            <h1>This sites backend operates on the render.com (free version) which goes
                 offline after 15 min of inactivity so sometimes it can take around 50s 
                 to intialize the backend after first server request.</h1>
        <button className="border w-full p-1" onClick={()=> {
            setShowRenderAlert(false)
        }}>Close</button>
        </div>
        </>
    )
}
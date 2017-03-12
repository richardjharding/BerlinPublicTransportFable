#r "../node_modules/fable-core/Fable.Core.dll"
#r "../node_modules/fable-elmish/Fable.Elmish.dll"
#r "../node_modules/fable-elmish-react/Fable.Elmish.React.dll"
#r "../node_modules/fable-react/Fable.React.dll"
#r "../node_modules/fable-powerpack/Fable.PowerPack.dll"

open Fable.Core
open Fable.React
open Fable.Import.React
open Fable.Helpers.React.Props
open Fable.Helpers.React
open Fable.Core.JsInterop
open Fable.PowerPack
open Elmish
open Elmish.React

module R = Fable.Helpers.React
type ZoomScale = ZoomScale of int
type vc= {b:float; f:float}
type Ec ={b: float; f:float }
type BoundingRect = {f: Ec; b:vc}
type RadarItem = {direction:string; latitude: float ; longitude: float}
type Model = {boundingRect: BoundingRect; zoomScale: ZoomScale; center: (float * float); Radar: RadarItem list}

type Message = 
    | GetRadar of BoundingRect
    | Refresh 
    | GetRadarError of exn
    | GetRadarReceived of RadarItem list
    | RadarSelected
    | ZoomChange of ZoomScale * BoundingRect

type RCom = ComponentClass<obj>

[<Import("Map", from="google-maps-react")>]
let MapComponent: RCom =jsNative

[<Emit("createElement(Map, $0)")>]
let gmap (props: IHTMLProp list) : ReactElement = jsNative

[<Import("Marker", from="google-maps-react")>]
let Marker: RCom = jsNative

let text (content: string) : ReactElement = unbox content

[<Emit("window[$0]")>]
let getFromWindow (name: string) : obj = jsNative
let google = getFromWindow "google"
let inline (!!) x = createObj x
let mapStyle = 
    createObj [
         unbox ("width","100%");
         unbox ("height", "100%");
         unbox ("position", "relative")
    ]

let startPos =
        createObj [            
            "lat" ==>  52.531677
            "lng" ==> 13.381777            
        ]

let boundsChange (map, dispatch) = 
    System.Console.WriteLine("bounds changed")
    let rect= map?getBounds()
    dispatch (GetRadar (rect:?> BoundingRect) )
    

let fetchRadar (rect:BoundingRect) =      
    // from google maps getBounds()
    // north = f.b south = f.f east= b.f west = b.b
    
    let url = sprintf "https://transport.rest/radar?north=%f&west=%f&south=%f&east=%f"  rect.f.b rect.b.b rect.f.f rect.b.f
    promise {
        let! result = Fetch.fetch url []
        return! result.json()
    }

let MapMarkers (radarItems: RadarItem list) =
    radarItems |> List.map (fun r ->                                     
                                    let element = Fable.Helpers.React.from Marker (createObj [
                                                                "name" ==> r.direction
                                                                "position" ==> createObj [
                                                                "lat" ==> r.latitude
                                                                "lng" ==> r.longitude
                                                                ]
                                                                ]) [] 
                                    element                                                             
                                    )    

let mapProps dispatch =
                 createObj 
                    [
                     "google" ==> google
                     "zoom" ==> 14
                     "center" ==> startPos
                     "initialCenter" ==> startPos
                     "style" ==> mapStyle                     
                     "onReady" ==> System.Func<_,_,_>(fun mapProps map  ->
                                map?addListener("bounds_changed",(System.Func<_>( fun () ->                                                                                                
                                       boundsChange(map,dispatch)                                                                                                
                                             ))))
                     ]


let view (model:Model) dispatch = 
    div
        []
        [
            h2 [] [text ("This is a live view of the Berlin public transport system")]            
            Fable.Helpers.React.from MapComponent (mapProps( dispatch)) (MapMarkers model.Radar)           
        ]

let update msg model : Model*Cmd<Message> = 
    match msg with
    | GetRadar rect -> {model with boundingRect = rect}, Cmd.ofPromise fetchRadar rect GetRadarReceived GetRadarError
    | Refresh -> model, Cmd.ofPromise fetchRadar model.boundingRect GetRadarReceived GetRadarError
    | GetRadarError ex ->  {model with Radar = []}, []
    | GetRadarReceived radarItems ->  {model with Radar = radarItems}, []
    | RadarSelected -> model, []
    | ZoomChange (z,b) -> {model with boundingRect = b}, Cmd.ofPromise fetchRadar b GetRadarReceived GetRadarError

let init() = {boundingRect= {b= {b= 0.0; f= 0.0}; f= {b= 0.0; f= 0.0}};
                     zoomScale = ZoomScale 14;
                      center = (52.531677, 13.381777);
                      Radar= []}, []

let timerTick dispatch =
    let t = new System.Timers.Timer 10000.
    t.Elapsed.Subscribe(fun _ -> dispatch Refresh) |> ignore
    t.Enabled <- true

let subscription _ = 
    Cmd.ofSub timerTick 

Program.mkProgram init update view
|> Program.withSubscription subscription
|> Program.withReact "app"
|> Program.run






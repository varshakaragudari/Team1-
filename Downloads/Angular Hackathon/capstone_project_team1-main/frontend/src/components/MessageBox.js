import '../css/MessageBox.css';

export default function MessageBox(props) {
  return (
    <div className="messagebox">
         <div className="messagebox-header p-2">
            <h3 className="h2-regular">{props.header}</h3>
         </div>
         <div className="p-2">
            <p>{props.message}</p>
         </div>
    </div>
  )
}
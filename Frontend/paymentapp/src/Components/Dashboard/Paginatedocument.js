import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Commentbox from './Commentbox'

function Paginatedocument() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0)


  const getData = () => {
    socket.emit("comments")
    socket.on("getcomments",function(data1,err){
      //alert("")
        const data = data1;
                  const slice = data.slice(offset, offset + perPage)
                  setData(slice)
                  setPageCount(Math.ceil(data.length / perPage))
    })
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};

 useEffect(() => {
   getData()
 }, [offset])
  return (
    <div className="App">
      {data.map((item,index)=>{
        return(<Commentbox username={item.username} comment={item.comment} commenttime={item.commenttime} key={index} />)
      })}
       <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );
}

export default Paginatedocument;

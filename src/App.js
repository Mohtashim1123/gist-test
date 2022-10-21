import './App.css';
import { useDebouncedCallback } from 'use-debounce';
import React, { useState, useEffect } from 'react'
import { getGistListByUserName } from './api';

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (value !== "") {
      getGistListByUserNameMethod()
    } else {
      setList([])
    }
  }, [value])

  const getGistListByUserNameMethod = () => {
    setLoading(true)
    getGistListByUserName(value)
      .then((response) => {
        if (response.status === 200) {
          setList(response.data)
          setLoading(false)
        } else {
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  const debounced = useDebouncedCallback(
    (value) => {
      setValue(value);
    },
    1000
  );

  const badges = {
    "application/javascript": "http://code-institute-org.github.io/Full-Stack-Web-Developer-Stream-0/assets/javascript.png",
    "application/x-python": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",


  }

  return (
    <div>
      <h1 style={{fontSize:'13px'}} className='textAlignCenter'>Gist API test</h1>
      <div className="bar">
        <input className="searchbar" type="text" placeholder="Search Username" onChange={(e) => debounced(e.target.value)} />
        <img className="voice" src="https://www.freeiconspng.com/uploads/search-icon-png-5.png" alt='search' />
      </div>
      <div className='listParent'>
        {loading
          ?
          <div className='loader'>
            <img src='https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif' height={50} width={50} alt="loader" />
          </div>
          :

          list.length === 0 ? <p className='textAlignCenter'>No record found</p> : list.map((item, index) => (
            <div key={item.id} className='cellParent'>
              <div className='avatarWithTextParent width20percent'>
                <div>
                  {index === list.length - 1 || index === list.length - 2 || index === list.length - 3 ?
                    <a href={item.forks_url} target="_blank">
                      <img className='avatar' src='https://avatars.githubusercontent.com/u/515861?v=4' alt={item?.owner?.login} height={50} width={50} />
                    </a>
                    :
                    <img className='avatar' src='https://avatars.githubusercontent.com/u/515861?v=4' alt={item?.owner?.login} height={50} width={50} />
                  }
                </div>
                <div className='width20percent'>
                  {index === list.length - 1 || index === list.length - 2 || index === list.length - 3 ?
                    <a href={item.forks_url} target="_blank">
                      <p className='margin0 name'>{item?.owner?.login}</p>
                    </a>
                    :
                    <p className='margin0 name'>{item?.owner?.login}</p>
                  }
                  <p className='margin0 nameId'>@{item?.owner?.login}</p>
                </div>
              </div>
              <div className='width20percent'>
                <p className='margin0 grayColor assistant'>Assistant secaretory</p>
                <p className='margin0 grayColor font-size-13'>legal Division</p>
              </div>
              <div className='width20percent'>
                <p className='margin0 grayColor font-size-13'>{item?.owner?.id}</p>
                <p className='margin0 grayColor font-size-13'>{item?.owner?.login}@gmail.com</p>
              </div>
              <div className='width20percent'>
                {Object.entries(item?.files)?.map((item, index) => (
                  badges[item[1].type] && <img key={index} src={badges[item[1].type]} height={30} width={50} alt="badge" />
                ))
                }
              </div>
            </div>))}
      </div>

    </div>
  );
}

export default App;

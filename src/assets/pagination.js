import React from 'react'

export default function Pagination() {
  return (
      <div className="row tm-row tm-mt-100 tm-mb-75">
          <div className="tm-prev-next-wrapper">
              <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next disabled tm-mr-20">Prev</a>
              <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next">Next</a>
          </div>
          <div className="tm-paging-wrapper">
              <span className="d-inline-block mr-3">Page</span>
              <nav className="tm-paging-nav d-inline-block">
                  <ul>
                      <li className="tm-paging-item active">
                          <a href="#" className="mb-2 tm-btn tm-paging-link">1</a>
                      </li>
                      <li className="tm-paging-item">
                          <a href="#" className="mb-2 tm-btn tm-paging-link">2</a>
                      </li>
                      <li className="tm-paging-item">
                          <a href="#" className="mb-2 tm-btn tm-paging-link">3</a>
                      </li>
                      <li className="tm-paging-item">
                          <a href="#" className="mb-2 tm-btn tm-paging-link">4</a>
                      </li>
                  </ul>
              </nav>
          </div>
      </div>            
  )
}

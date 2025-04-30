import React from "react";
import "./KnowledgeBase.css";
const KnowledgeBase = () => (
  <div className="knowledge-base">
    <div className="kb-card total-orders">
      <div className="kb-icon">📦</div>
      <div className="kb-label">Total Orders</div>
    </div>
    <div className="kb-card total-earnings">
      <div className="kb-icon">💰</div>
      <div className="kb-label">Total Earnings</div>
    </div>
    <div className="kb-card profit">
      <div className="kb-icon">📈</div>
      <div className="kb-label">Profit</div>
    </div>
  </div>
);
export default KnowledgeBase;

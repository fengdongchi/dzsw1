package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeStockInfo;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class StockInfoupdateAction extends ActionSupport{
    private boolean success;
    private String message;
    private List<TMeStockInfo> stocklist;
    private TMeStockInfo stock;
    @Resource
    private BaseDAO<TMeStockInfo> dao;

    public String update(){
        stocklist=dao.myfindByHql("from TMeStockInfo where TMeMerchandiseInfoByMerchandiseId=?",stock.getTMeMerchandiseInfoByMerchandiseId());
        if(stocklist.size()>0){
            setMessage("更新失败，请重新更改");
            setSuccess(false);
            return SUCCESS;
        }
        dao.update(stock);
        setMessage("更新成功！");
        setSuccess(true);
        return SUCCESS;
    }

    public List<TMeStockInfo> getStocklist() {
        return stocklist;
    }

    public void setStocklist(List<TMeStockInfo> stocklist) {
        this.stocklist = stocklist;
    }

    public TMeStockInfo getStock() {
        return stock;
    }

    public void setStock(TMeStockInfo stock) {
        this.stock = stock;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}

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
public class StockInfoinsertAction extends ActionSupport{
    private boolean success;
    private String message;
    private TMeStockInfo stock;
    private boolean failse;
    private List<TMeStockInfo> stocklist;
    @Resource
    private BaseDAO<TMeStockInfo> dao;

    public String insert(){
        stocklist=dao.listAll(TMeStockInfo.class);
        for(TMeStockInfo u:stocklist){
            if(u.getTMeMerchandiseInfoByMerchandiseId().equals(stock.getTMeMerchandiseInfoByMerchandiseId())){
                setSuccess(true);
                setFailse(false);
                setMessage("您插入失败！");
                return SUCCESS;
            }
        }
        setFailse(true);
        setMessage("插入成功！");
        setSuccess(true);
        dao.insert(stock);
        return SUCCESS;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TMeStockInfo getStock() {
        return stock;
    }

    public void setStock(TMeStockInfo stock) {
        this.stock = stock;
    }

    public List<TMeStockInfo> getStocklist() {
        return stocklist;
    }

    public void setStocklist(List<TMeStockInfo> stocklist) {
        this.stocklist = stocklist;
    }
}

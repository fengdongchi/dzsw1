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
public class StockInfodeleteAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private TMeStockInfo stock;
    @Resource
    private BaseDAO<TMeStockInfo> dao;

    public String delete(){
        if(stock !=null){
            dao.delete(stock);
            setFailse(true);
            setSuccess(true);
            setMessage("删除成功！");
            return SUCCESS;
        }
        setFailse(false);
        setSuccess(true);
        setMessage("删除失败！");
        return SUCCESS;
    }


    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
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

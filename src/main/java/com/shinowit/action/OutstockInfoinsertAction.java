package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;

import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import com.shinowit.service.Outstock;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
public class OutstockInfoinsertAction extends ActionSupport {

    private boolean success;

    private String message;

    private TMeOutStockInfo myFrom;

    private List<TMeOutStockDetailsInfo> outstockdetail;
    @Resource
    private Outstock outs;

    public String insert(){

        boolean status = outs.outstockinsert(myFrom, outstockdetail);
        if(status==true){
            setSuccess(true);
            setMessage("插入成功");
            return SUCCESS;
        }
            setSuccess(false);
            setMessage("插入失败");
            return SUCCESS;
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

    public TMeOutStockInfo getMyFrom() {
        return myFrom;
    }

    public void setMyFrom(TMeOutStockInfo myFrom) {
        this.myFrom = myFrom;
    }

    public List<TMeOutStockDetailsInfo> getOutstockdetail() {
        return outstockdetail;
    }

    public void setOutstockdetail(List<TMeOutStockDetailsInfo> outstockdetail) {
        this.outstockdetail = outstockdetail;
    }
}

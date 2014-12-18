package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.service.Instock;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
public class InstockInfoinsertAction extends ActionSupport {

    private boolean success;

    private String message;

    private TMeInStockInfo inmyFrom;

    private Boolean status;

    private List<TMeInStockDetailsInfo> instockdetail;
    @Resource
    private Instock ins;

    public String insert(){
        for(int i=0;i<100;i++){
            status = ins.instockinsert(inmyFrom,instockdetail);

        }
        if(status==true){
            setSuccess(true);
            setMessage("插入成功");
            return SUCCESS;
        }
            setSuccess(false);
            setMessage("插入失败");
            return SUCCESS;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public TMeInStockInfo getInmyFrom() {
        return inmyFrom;
    }

    public void setInmyFrom(TMeInStockInfo inmyFrom) {
        this.inmyFrom = inmyFrom;
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

    public List<TMeInStockDetailsInfo> getInstockdetail() {
        return instockdetail;
    }

    public void setInstockdetail(List<TMeInStockDetailsInfo> instockdetail) {
        this.instockdetail = instockdetail;
    }
}

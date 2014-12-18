package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import com.shinowit.service.Instockdelete;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/25.
 */
public class InstockInfodeleteAction extends ActionSupport {
    private boolean success;
    private boolean failse;
    private String message;
    private String arry;

    @Resource
    private Instockdelete insdl;

    public String delete(){

        boolean status = insdl.instockdelete(arry);
        if(!status){
            setSuccess(true);
            setFailse(false);
            setMessage("删除失败！");
            return SUCCESS;
        }
        setMessage("删除成功！");
        setSuccess(true);
        setFailse(true);
        return SUCCESS;
    }

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
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

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }


}

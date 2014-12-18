package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/17.
 */
public class MerchandiseCInfoAction extends ActionSupport {
    private boolean success;
    private boolean failse;
    private String message;
    private List<TMeMerchandiseCInfo> list;
    private TMeMerchandiseCInfo mcd;
    @Resource
    private BaseDAO<TMeMerchandiseCInfo> dao;

    public String insert(){
        list=dao.listAll(TMeMerchandiseCInfo.class);
        for(TMeMerchandiseCInfo u:list){
            if(u.getMerchandiseCid().trim().equals(mcd.getMerchandiseCid().trim())){
                setFailse(false);
                setSuccess(true);
                setMessage("您插入的商品类别已存在！");
                return SUCCESS;
            }

        }
        dao.insert(mcd);
        setFailse(true);
        setSuccess(true);
        setMessage("插入成功！");
        return SUCCESS;
    }

    public String update(){
        list=dao.myfindByHql("from TMeMerchandiseCInfo where merchandiseCName=?",mcd.getMerchandiseCName());
        for(TMeMerchandiseCInfo t:list){
            if(t.getMerchandiseCName().equals(mcd.getMerchandiseCName())){
                success=false;
                message="更新失败";
                return SUCCESS;
            }
        }
        boolean result=dao.update(mcd);
        if(result==false){
            success=false;
            message="更新失败";
            return SUCCESS;
        }else{
            success=true;
            message="更新成功";
            return SUCCESS;
        }
    }
    public String delete(){
        dao.delete(mcd);
        setMessage("删除成功！");
        setSuccess(true);
        setFailse(true);
        return SUCCESS;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<TMeMerchandiseCInfo> getList() {
        return list;
    }

    public void setList(List<TMeMerchandiseCInfo> list) {
        this.list = list;
    }

    public TMeMerchandiseCInfo getMcd() {
        return mcd;
    }

    public void setMcd(TMeMerchandiseCInfo mcd) {
        this.mcd = mcd;
    }
}
